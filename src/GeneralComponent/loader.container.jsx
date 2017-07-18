import React from 'react';
import Store from '../store';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import shortParagraph from '../styles/img/short-paragraph.png';

export default class LoaderComponent extends React.Component {
    paragraphs =()=>{
        let images = [];
        console.log(this.props.loader.paragraphs);
        for(let i=0;i<this.props.loader.paragraphs;i++){
            images.push(<Image key ={i} src={shortParagraph} />);
        }
        return images;
    }
    getStyle=()=>{
        return (this.props.loader.loading) ? {display: 'block'} : {display: 'none'};
    }
    render() {
        return (
            <div style={this.getStyle()}>
            <Segment>
                <Dimmer active inverted>
                    <Loader size='large'>{this.props.loader.loadingText}</Loader>
                </Dimmer>
                {this.paragraphs()}
            </Segment>
            </div>
        );
    }
}