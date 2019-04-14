import React, { Component } from "react";
import { getSample } from "../../actions/sample";
import { connect } from "react-redux";

class Sample extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSample();
    }

    sampleList() {
        return this.props.payload.data.map(sample => {
            return <li key={sample.id}> {sample.sample} </li>;
        });
    }

    render() {
        console.log("Value of loading sample", this.props.isLoading);
        console.log("Value of payload sample", this.props.payload.data);
        console.log("Value of error sample", this.props.isError);

        let loading = this.props.isLoading;
        let error = this.props.isError;

        if (loading) {
            return <h1>Loading</h1>;
        }

        if (error) {
            return <h1>Error</h1>;
        }

        return (
            <div>
                <h1>Sample</h1>
                <ul>{this.sampleList()}</ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("Value of state in sample", state.sample);
    return {
        isLoading: state.sample.isLoading,
        isError: state.sample.isError,
        payload: state.sample.payload
    };
};

const mapDispatchToProps = {
    getSample
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sample);
