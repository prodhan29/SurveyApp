import React from 'react';

export default class Treeview extends React.Component {

    constructor(props) {
        super(props);
        let _this = this;
        this.state = {
            data: _this.props.data,
            editableNode: ''
        }
    }

    handleEditChange = (e, value) => {
        value[e.target.name] = e.target.value;
        this.setState({ value });
    }

    deleteNode = (parent, index) => {
        parent.splice(index, 1);
        this.setState({ parent });
    }

    makeEditable = (value) => {
        this.state.editableNode = JSON.parse(JSON.stringify(value));
        value.editMode = true;
        this.setState({ value });
    }

    closeForm = (value) => {
        this.state.editableNode;
        value.name = this.state.editableNode.name;
        value.exportValue = this.state.editableNode.exportValue;
        value.editMode = false;
        this.setState({ value });
    }

    doneEdit = (value) => {
        value.editMode = false;
        this.setState({ value });
    }

    toggleView = (ob) => {
        ob.showChildren = !ob.showChildren;
        this.setState({ ob });
    }

    addMember = (parent) => {
        let newChild = {
            name: 'NEW OPTION',
            exportValue: 0,
            showChildren: false,
            children: []
        }
        parent.push(newChild);
        this.setState({ parent });
    }

    addChild = (node) => {
        node.showChildren = true;
        node.children.push({
            name: 'NEW OPTION',
            exportValue: 0,
            showChildren: false,
            children: []
        });
        this.setState({ node });
    }

    nodeEditForm = (value) => {
        let _this = this;
        return (
            <div className="node node_edit" onClick={function (e) { e.stopPropagation() }}>
                <form className="node_edit_form">
                    <div className="field name">
                        <input value={value.name}
                            type="text"
                            name='name'
                            onChange={function (e) { _this.handleEditChange(e, value) }} />
                    </div>
                    <div className="field code">
                        <input value={value.exportValue}
                            type="text"
                            name='exportValue'
                            onChange={function (e) { _this.handleEditChange(e, value) }} />
                    </div>
                    <div className="field action_node">
                        <span className="fa fa-check" onClick={function (e) { _this.doneEdit(value) }}></span>
                        <span className="fa fa-close" onClick={function (e) { _this.closeForm(value) }}></span>
                    </div>
                </form>
            </div>
        )
    }

    makeChildren = (node) => {
        if (node.length === 0) return null;

        let _this = this;
        let children;
        children = node.map(function (value, index) {

            let item = null;

            // A node has children and want to show her children
            if (value.children.length > 0 && value.showChildren) {
                let babies = _this.makeChildren(value.children);
                let normalMode = (
                    <div className="node">
                        <i className="fa fa-minus-square-o"></i>{value.name}
                        <span className="actions">
                            <i className="fa fa-close" onClick={function (e) { e.stopPropagation(); _this.deleteNode(node, index) }}></i>
                            <i className="fa fa-pencil" onClick={function (e) { e.stopPropagation(); _this.makeEditable(value) }}></i>
                        </span>
                    </div>
                )
                item = (
                    <li key={index} onClick={function (e) { e.stopPropagation(); _this.toggleView(value) }}>
                        {(value.editMode) ? _this.nodeEditForm(value) : normalMode}
                        {babies}
                    </li>
                )
            }

            // A node has children but don't want to showing her children
            else if (value.children.length > 0 && !value.showChildren) {
                item = (
                    <li key={index} onClick={function (e) { e.stopPropagation(); _this.toggleView(value) }}>
                        <div className="node"><i className="fa fa-plus-square-o"></i>{value.name}</div>
                    </li>
                );
            }

            // A node has no children
            else if (value.children.length === 0) {
                let normalMode = (
                    <div className="node"><i className="fa fa-square-o"></i>{value.name}
                        <span className="actions">
                            <i className="fa fa-plus" onClick={function (e) { e.stopPropagation(); _this.addChild(value) }}> </i>
                            <i className="fa fa-pencil" onClick={function (e) { e.stopPropagation(); _this.makeEditable(value) }}></i>
                            <i className="fa fa-close" onClick={function (e) { e.stopPropagation(); _this.deleteNode(node, index) }}></i>
                        </span>
                    </div>
                );

                item = (
                    <li key={index} onClick={(e) => e.stopPropagation()}>
                        {(value.editMode) ? _this.nodeEditForm(value) : normalMode}
                    </li>
                );
            }
            return item;
        });

        return (
            <ul >
                {children}
                <li>
                    <div className="node add_node" onClick={function (e) { e.stopPropagation(); _this.addMember(node) }}>
                        <i className="fa fa-square" ></i>
                        <a >Add New</a>
                    </div>
                </li>
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
