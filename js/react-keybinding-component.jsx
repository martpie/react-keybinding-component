import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class KeybindingComponent extends Component {

    constructor(props) {

        super(props);
        this.state = {};
        this.onKey = this.onKey.bind(this);
        this.targetsBlacklist = ['textarea', 'input', 'select'];
    }

    render() {
        return false;
    }

    onKey(e) {
        if(this.props.preventDefault) e.preventDefault();
        if(this.props.stopPropagation) e.stopPropagation();
        if(!(this.props.preventInputConflict && (this.targetsBlacklist.indexOf(e.target.tagName.toLowerCase()) > -1))) this.props.onKey(e);
    }

    componentDidMount() {
        if(typeof this.props.target === 'string') document.querySelector(this.props.target).addEventListener(this.props.type, this.onKey);
        else if(typeof this.props.target === 'object') this.props.target.addEventListener(this.props.type, this.onKey);
    }

    componentWillUnmount() {
        if(typeof this.props.target === 'string') document.querySelector(this.props.target).removeEventListener(this.props.type, this.onKey);
        else if(typeof this.props.target === 'object') this.props.target.removeEventListener(this.props.type, this.onKey);
    }
}

KeybindingComponent.defaultProps = {
    onKey                :  () => {},
    type                 : 'keydown',
    target               :  document,
    preventInputConflict :  false,
    preventDefault       :  false,
    stopPropagation      :  false
};

KeybindingComponent.propTypes = {
    onKey                : PropTypes.func,
    type                 : PropTypes.string,
    target               : PropTypes.oneOfType(PropTypes.string, PropTypes.object]),
    preventInputConflict : PropTypes.bool,
    preventDefault       : PropTypes.bool,
    stopPropagation      : PropTypes.bool
};

export default KeybindingComponent;
