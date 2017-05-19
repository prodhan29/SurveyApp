import React from 'react';

export default class Treeview extends React.Component {

    constructor(props) {
        super(props);
        let _this = this;
        this.state = {
            data: _this.props.data,
        }
    }

    toggleEdit = (ob) => {
        ob.showChildren = !ob.showChildren;
        this.setState({ob});
    }

    makeChildren = (node) => {
        if (node.length === 0) return null;

        let _this = this;
        let children;
        children = node.map(function (value, index) {

            let item = null;
            if (value.children.length > 0 && value.showChildren) {

                let babies = _this.makeChildren(value.children);
                item = (
                    <li key = {index} onClick = {function(e){e.stopPropagation(); _this.toggleEdit(value)}}>
                        <div className="node">
                            <i className="fa fa-minus-square-o"></i>{value.name}
                            <span className="actions"><i className="fa fa-close"></i><i className="fa fa-pencil"></i> </span>
                        </div>
                        {babies}
                     </li>   
                )

            }
            else if (value.children.length > 0 && !value.showChildren) {
                item = (<li key = {index} onClick = {function(e){e.stopPropagation(); _this.toggleEdit(value)}}><div className="node"><i className="fa fa-plus-square-o"></i>{value.name}</div></li>);
                           
            }
            else if (value.children.length === 0) {
                item = (<li key = {index} onClick = {(e)=>e.stopPropagation()}><div className="node"><i className="fa fa-square-o"></i>{value.name}<span className="actions"><i className="fa fa-close"></i><i className="fa fa-pencil"></i> </span></div></li>);
            }

            return item; 
        });

        return(
            <ul > 
                {children}
                <li><div className="node add_node"><i className="fa fa-square"></i><a href="">Add New</a> </div></li>
            </ul>
        )
    }

    getNodes = () => {

        let children = this.makeChildren(this.state.data.children);
        return (
            <div className="tree">
                <span className="root">{this.state.data.name}</span>
                {children}
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="segment_title segment_title_with_action">Calculation Rules
                    <span className="add">
                        <i className="material-icons">more_vert</i>
                    </span>
                </div>
                <div className="group_dropdown_content">
                    {this.getNodes()}
                </div>
            </div>
        );
    }
}

//------------- Showing children ----------
/*
<ul>
    <li>
        <div className="node">
            <i className="fa fa-minus-square-o"></i>Dhaka (DHK)
            <span className="actions"><i className="fa fa-close"></i><i className="fa fa-pencil"></i> </span>
        </div>
        <ul>
            <li><div className="node"><i className="fa fa-square-o"></i>Satgram (SAT)<span className="actions"><i className="fa fa-close"></i><i className="fa fa-pencil"></i> </span></div></li>
            <li><div className="node"><i className="fa fa-square-o"></i>Satgram (SAT)<span className="actions"><i className="fa fa-close"></i><i className="fa fa-pencil"></i> </span></div></li>
            <li><div className="node add_node"><i className="fa fa-square"></i><a href="">Add New</a> </div></li>
        </ul>
    </li>
</ul>
*/

//------------- Don't show children -------
/*
<ul>
    <li><div className="node"><i className="fa fa-plus-square-o"></i>Mymenshingh (MYM)</div></li>
    <li><div className="node"><i className="fa fa-plus-square-o"></i>Rangpur (RAN)</div></li>
</ul>
*/


// ---------------- Editing mode -----------
/*
<div className="node node_edit">
    <form className="node_edit_form">
        <div className="field name"><input value="Gopalganj" type="text" /> </div>
        <div className="field code"><input value="GOP" type="text" /> </div>
        <div className="field action_node">
            <span className="fa fa-check"></span>
            <span className="fa fa-close"></span>
        </div>
    </form>
</div>
*/
