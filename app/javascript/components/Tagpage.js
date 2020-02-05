import React, { Component } from 'react';
import MyContext from './MyContext';
import 'pure-css'

class Tagpage extends Component{
	static contextType=MyContext;
	constructor(props,context)
	{
		super(props, context)
this.addtag=this.addtag.bind(this)
this.delete_tag=this.delete_tag.bind(this)
	}
	addtagform()
	{	
		return(<form className="pure-form" onSubmit={e=>{this.addtag(e); e.target.reset();}}>

		<input ref={input=>this.formfield.name=input} placeholder='Enter new Tag'/>

			<input type="submit" value="submit"/></form>

	)}
formfield={name:""}


	async addtag(e){

		e.preventDefault()

		let body= JSON.stringify({tag: {name: this.formfield.name.value}})
		console.log(body);

  let reponse= await fetch('/api/v1/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})

  await this.context.fetchData()
	}
async delete_tag(id){
 		 let response= await fetch(`/api/v1/tags/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
 		 await this.context.fetchData()
  }
rendertaglist(){
	let tag_list=this.context.tags
	let tagarray=[]
	for(let i=0;i<tag_list.length; i++){
		let current_tag=tag_list[i]
		tagarray.push(<tr key={current_tag.id}><td>{i+1}</td><td>{current_tag.name}</td>
<td><button className="pure-button" onClick={()=>this.delete_tag(current_tag.id)}>Remove</button></td>
			</tr>)

	}
	return <table className="pure-table pure-table-bordered"><thead><tr><th>No.</th><th>Name</th><th></th></tr></thead><tbody>
	{tagarray}</tbody></table>
}
render(){
	return <div><h1>You have {this.context.tags.length} tags currently in use</h1>
	<div>{this.addtagform()}</div>{this.rendertaglist()}</div>

}


}
export default Tagpage