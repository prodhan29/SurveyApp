import React from 'react';

export default class Dropdown extends React.Component {

    render() {
        let _this = this;
        return (
            <div className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.props.selectedData}<i className="fa fa-chevron-down"></i></a>
                <ul className="dropdown-menu">
                    {
                        this.props.items.map(function (value, index) {
                            return (
                                <li key={index}
                                    onClick={() => _this.props.onClick(value, index, _this.props.name)}>
                                    <a href="#">{value.name}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}
