import React, { Component } from 'react';



class KeybindingComponent extends Component {

    constructor(props) {

        super(props);
        this.state = {};
        this.onKey = this.onKey.bind(this);
    }

    render() {

        return false;
    }

    onKey(e) {
        this.props.onKey(e);
    }

    componentDidMount() {
        var self = this;
        this.props.elem.addEventListener(this.props.type, this.onKey);
    }

    componentWillUnmount() {
        var self = this;
        this.props.elem.removeEventListener(this.props.type, this.onKey);
    }
}

KeybindingComponent.defaultProps = {
    onKey :  () => {},
    type  : 'keydown',
    elem  :  document
};

KeybindingComponent.propTypes = {
    onKey : React.PropTypes.func,
    type  : React.PropTypes.string,
    elem  : React.PropTypes.object
};

export default KeybindingComponent;
