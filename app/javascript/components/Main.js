import React, { Component} from 'react';
import MyContext from './MyContext';

import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import About from './About'
import Home from './Home'
import Taskpage from './Taskpage'
import Manual from './Manual'
import Tagpage from './Tagpage'

class Main extends Component {
	constructor(){
		super();
		this.state={
			loaded: false,
			data:{

			}
			};

this.fetchData=this.fetchData.bind(this);
this.sortData=this.sortData.bind(this);
	}
createaray(size){
	let arr=[]
	for(let i=0; i<size;i++){
		arr[i]=true;
	}
	return arr;
}
async fetchData()
{	
	let [tasks,tags,taggings]=[];

	try{
	 [tasks, tags, taggings]=await Promise.all( 
		[fetch("/api/v1/tasks").then(value=>value.json()),
		fetch("api/v1/tags").then(value=>value.json()),
		fetch("api/v1/taggings").then(value=>value.json())])
}
	catch(err){
		console.log(err);
	}
this.sortData(tasks, tags, taggings)

}

	sortData(tasks, tags, taggings){
		let tasks_with_tags=[];
	let task_len=tasks.length;
	for(let i=0; i<task_len; i++){
		let task=tasks[i];
		let taskid=task.id;
		let associated_taggings=taggings.filter((tagging)=>tagging.task_id===taskid);
		let associated_tags=associated_taggings.map((tagging)=>tags.find((tag)=>tag.id===tagging.tag_id));
		tasks_with_tags[i]={task: task, associated_tags: associated_tags, associated_taggings: associated_taggings};
	}
	let tags_with_tasks=[];
	let tag_len=tags.length;
	for(let i=0; i<tag_len; i++){
		let tag=tags[i];
		let tagid=tag.id;
		let associated_taggings=taggings.filter((tagging)=>tagging.tag_id===tagid);
		let associated_tasks=associated_taggings.map((tagging)=>tasks.find((task)=>task.id===tagging.task_id));
		tags_with_tasks[i]={tag: tag, associated_tasks: associated_tasks, associated_taggings: associated_taggings};
	}
	this.setState({loaded: true, data: {tasks: tasks, 
										tags: tags,
										taggings: taggings,
										tasks_with_tags: tasks_with_tags,
										tags_with_tasks: tags_with_tasks,
										fetchData: this.fetchData}})

}


componentDidMount(){


this.fetchData()

}
	render() {
	

		let taskpage=this.state.loaded ? <Taskpage /> : <div><h1>LOADING!</h1></div>;
		let tagpage=this.state.loaded ? <Tagpage /> : <div><h1>LOADING!</h1></div>;


		return (
			<Router>
			<div>
			<ul>
			<li><Link to="/">Home</Link></li>
			<li><Link to="/about">About</Link></li>
			<li><Link to="/taskpage">Tasks</Link></li>
			<li><Link to="/tagpage">Tags</Link></li>
			<li><Link to="/manual">Manual</Link></li>

			</ul>
			<div className="content">
			<MyContext.Provider value={this.state.data}>
			<Switch>
			<Route exact path="/about">
			<About />
			</Route>

			<Route exact path="/taskpage">
			
			{taskpage}

			</Route>
			<Route exact path="/tagpage">
			{tagpage}
			</Route>
			<Route exact path="/manual">
			<Manual />
			</Route>
			<Route exact path="/">
			<Home />
			</Route>
</Switch></MyContext.Provider>



				</div>
		</div>	</Router>
		);
	}
}

export default Main;
