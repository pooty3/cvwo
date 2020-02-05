import React, { Component } from 'react';
import MyContext from './MyContext';

 class Taskpage extends Component {
 	static contextType = MyContext
 	constructor(props, context){

  		super(props,context)
  	
 		
 	this.add_form_submit=this.add_form_submit.bind(this)
 	this.deletetask=this.deletetask.bind(this)

 	this.edit_form=this.edit_form.bind(this)
 	this.edit_form_submit=this.edit_form_submit.bind(this)
 	this.handletagChange=this.handletagChange.bind(this)
 	this.state={editing: -1,
 				selected_tag: -1}
 	}

 
 	componentDidMount(){


    
 	}


 	async deletetask(id){
 		 let response= await fetch(`/api/v1/tasks/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
 		 await this.context.fetchData()
  }
 	edit_form(task){
 		const associated_tags=task.associated_tags;
 		const checkboxes_array=[];
 		const checkbox_bool_array=[];
		const tag_list=this.context.tags;
		const len=tag_list.length;
		for (let i=0; i<len; i++){
			if(associated_tags.filter((tag)=>tag.id===tag_list[i].id).length>0){
				checkbox_bool_array[i]=true;
			}else{
				checkbox_bool_array[i]=false;
			}
		}

		for(let i=0; i<len; i++){
			checkboxes_array[i]=<label key={tag_list[i].id}>{tag_list[i].name}<input ref={input=>this.edit_formfield.checkboxes[i]=input}
			type="checkbox" defaultChecked={checkbox_bool_array[i]}  />	</label>;
	}
		

		return(<form  className="pure-form" onSubmit={e=>{this.edit_form_submit(e, task.task.id);}}>
		<input ref={input=>this.edit_formfield.title=input} defaultValue={task.task.title}/>
		<input ref={input=>this.edit_formfield.description=input} defaultValue={task.task.description}/>
		{checkboxes_array} <input type="submit" value="Submit" /></form>)


		



 	}
 	async edit_form_submit(e, id){
 		e.preventDefault()
 		this.state.editing=-1;
 		let raw_input_tag_list=this.edit_formfield.checkboxes.map(input=>input.checked)
		let task_title=this.edit_formfield.title.value
		let task_description=this.edit_formfield.description.value
		let tag_id_list=[]
		let len=raw_input_tag_list.length
		for(let i=0; i<len; i++){
			if(raw_input_tag_list[i]){
				tag_id_list.push(this.context.tags[i].id);}
				else{}
			
		}
 		let body= JSON.stringify({task: {title: task_title, description: task_description, tag_ids: tag_id_list}})
 		let response = await fetch(`/api/v1/tasks/${id}`, 
    	{
      method: 'PUT',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      	}
    	}).then((response) => {return response.json()})
  			
     await this.context.fetchData()
}


 	rendertasktable(){

 		const tasks_with_tags_array=[]
 		const tasks_with_tags=this.context.tasks_with_tags;
 		const len=tasks_with_tags.length
 		let ind=1;
		for(let i=0; i<len; i++)
		{	
			const current_task=tasks_with_tags[i];
			const boo=current_task.associated_tags.find(tag=>tag.id==this.state.selected_tag)
			if(this.state.selected_tag==-1||boo!=undefined)
			{if (this.state.editing!==i){

			const tag_list_string=current_task.associated_tags.reduce(
				(tot,tag)=>tot+tag.name+", ", "")
	

			const task_title=current_task.task.title;
			const task_description=current_task.task.description;
			const edit_button=this.state.editing===-1
			? <button className="pure-button" onClick={()=>this.setState({editing: i})}>Edit!</button>
			: <button className="pure-button pure-button-disable">Wait!</button> 
			tasks_with_tags_array[i]= <tr key={current_task.task.id}>
			<td>{ind}</td>
			<td>{task_title}</td>
			<td>{task_description}</td>
			<td>{tag_list_string}</td>
			<td><button className="pure-button" onClick={()=>this.deletetask(current_task.task.id)}>DELETE!</button>
			{edit_button}</td>
			</tr>;
			ind++;
			}
			else{

				tasks_with_tags_array[i]=<tr key={current_task.task.id}><td>{i+1}</td><td colSpan={4}>{this.edit_form(current_task)}</td></tr>
			}

		}else{}
	}
		return (<table className="pure-table pure-table-bordered">
		<thead>
		<tr><th>No.</th><th>Task</th><th>Description</th><th>List of Tags</th><th></th></tr>
		</thead>	
		<tbody>
		{tasks_with_tags_array}
		</tbody>
		</table>)

	}

	
	async add_form_submit(e){

		e.preventDefault();
		
		let raw_input_tag_list=this.add_formfield.checkboxes.map(input=>input.checked)
		let task_title=this.add_formfield.title.value
		let task_description=this.add_formfield.description.value
		let tag_id_list=[]
		let len=raw_input_tag_list.length
		for(let i=0; i<len; i++){
			if(raw_input_tag_list[i]){
				tag_id_list.push(this.context.tags[i].id);}
				else{}
			
		}

		let body= JSON.stringify({task: {title: task_title, description: task_description, tag_ids: tag_id_list}})


  let reponse= await fetch('/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})

 this.setState({
    editing: -1
}, async () => {
    this.context.fetchData();
});

}
	add_formfield={checkboxes: [],
			title: "",
			description: ""

				}
edit_formfield={checkboxes: [],
			title: "",
			description: ""

				}
			
			
	addtaskform(){

		const checkboxes_array=[];
		const tag_list=this.context.tags;
		const len=tag_list.length

		for(let i=0; i<len; i++){
			checkboxes_array[i]=<label key={tag_list[i].id}>{tag_list[i].name}<input ref={input=>this.add_formfield.checkboxes[i]=input}
			type="checkbox" defaultChecked={false}  />	</label>;
			

		}
		return <form  className="pure-form" onSubmit={e=>{this.add_form_submit(e);e.target.reset();}}>
		<input ref={input=>this.add_formfield.title=input} placeholder='Enter new Task'/>
		<input ref={input=>this.add_formfield.description=input} placeholder='Enter new Task Description'/>
		{checkboxes_array} <input type="submit" value="Submit" /></form>

	}
	handletagChange(e){
		this.setState({selected_tag:e.target.value});
	}
	tagselection(){
		const tag_list=this.context.tags;
		const len=tag_list.length;
		const dropbox_array=[];
		for(let i=0;i<len;i++){
			dropbox_array[i]=<option key={tag_list[i].id} value={tag_list[i].id}>{tag_list[i].name}</option>;
		}
		return <form className="pure-form"><label>Select Tag:<select value={this.state.selected_tag} onChange={this.handletagChange}>
		<option value={-1}>N/A</option>{dropbox_array}</select></label></form>

	}
	render() {

		let title=null;
		let task_table=null;
		if(this.state.selected_tag==-1)
		{ title= <h1>You have {this.context.tasks.length} tasks left!</h1>;
		
		;}else{
			const tag=this.context.tags.find(tag=>tag.id==this.state.selected_tag);
			const length=this.context.tags_with_tasks.find(tag=>tag.tag.id==this.state.selected_tag).associated_tasks.length;
			 title=<h1>Showing {length} tasks with {tag.name}</h1>
		}return (<div>{title}{this.addtaskform()}{this.tagselection()}{this.rendertasktable()}</div>)
		
	}
}



export default Taskpage

