import React from 'react';
import TreatValidation from '../common/tickValidation.component';
import DateTime from 'react-datetime';
import moment from 'moment';

export default class DateValiation extends React.Component {

    constructor(){
        super();
        this.state = {
            ob:{
                target:{
                    name: 'validationRange',
                    value: '',
                    attributes:{
                        data:''
                    }
                }
            }
        }
    }

    getAns=()=>{
        if(!this.props.data.fieldType.treatAsError && !this.props.data.fieldType.treatAsWarning){ return 3; }
        else if(this.props.data.fieldType.treatAsError){ return 2; }
        else { return 1; }
    }

    datetimeChange=(e, name)=>{

        var property = this.props.active+'Range';
        var dt = this.props.data[property].split('-');
        if(name == 'start'){
            dt[0] = (this.props.active == 'date') ? this.parseDate(e._d) : this.parseTime(e._d);
        }
        else {
            dt[1] = (this.props.active == 'date') ? this.parseDate(e._d) : this.parseTime(e._d);
        }
        this.state.ob.target.name = property;
        this.state.ob.target.value = dt.join('-');
        this.props.dataChange(this.state.ob);
    }

    parseDate=(d)=>{
        return d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    }

    parseTime=(d)=>{
        return moment(d).format('HH:mm A');
    }

    getDate=(point)=>{
        var dt = this.props.data[this.props.active+'Range'].split('-');
        return (point == 'start') ? dt[0] : dt[1];
    }

    render(){
        return(
            <div>
                <div>
                    Start :<DateTime dateFormat = {(this.props.active == 'date')?'DD/MM/YYYY':false}
                                     timeFormat = {this.props.active == 'time' ? 'HH:mm A' : false}
                                     onChange = {(e)=>this.datetimeChange(e, 'start')}
                                     value = {this.getDate('start')} />
            </div><br/>
                <div>
                    End :<DateTime dateFormat = {(this.props.active == 'date')?'DD/MM/YYYY':false}
                                   timeFormat = {this.props.active == 'time' ?  'HH:mm A' : false}
                                   onChange = {(e)=>this.datetimeChange(e, 'end')}
                                   value = {this.getDate('end')}/>
                </div>
                <TreatValidation data = 'treatValidation'
                                 ans = {this.getAns()}
                                 onchange = {this.props.dataChange}/>
            </div>
        );
    }
}
