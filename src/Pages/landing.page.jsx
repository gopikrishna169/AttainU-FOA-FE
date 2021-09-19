import React, { Component } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './landing.page.css'
class LandingPage extends Component {
    constructor(props) {
        super();
        this.state = {
            searchText: '',
            restaturants: []
        }
        this.handleSearchText = this.handleSearchText.bind(this);
        this.searchFunction = this.searchFunction.bind(this);
    }

    handleSearchText = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }
    searchFunction = async () => {
        const response = await fetch("http://localhost:3001/restaurant?searchText=" + this.state.searchText, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjE0NzNkZTNhYTZhNGUwOTQzMjdiOWU4IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjMyMDc1MDA2LCJleHAiOjE2MzIwODIyMDZ9.LNdtt3FNDpgePTf3jSUcdQRKNDLEP629I0Pr5wbiH54"
            },
        })
        .then(async (resp) => {
            let res = await resp.json()
            this.setState({ restaturants: res })
        })
    }
    render() {
        let rest = <span />
        if (this.state.restaturants.length > 0) {
            rest = this.state.restaturants.map((rest) => {
                return (<Card>
                    <Card.Body>
                        <Card.Title>{rest.name}</Card.Title>
                        <Card.Text>
                            {rest.address}
                  </Card.Text>
                        <Button variant="primary">See Menu</Button>
                    </Card.Body>
                </Card>)
            })
        }
        return (
            <div className="landing-page">
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search by Restaturant/ Food/ Place"
                        aria-label="search"
                        aria-describedby="basic-addon2"
                        onChange={(event) => { this.handleSearchText(event) }}
                    />
                    <Button
                        variant="primary"
                        onClick={this.searchFunction}
                    >Search</Button>
                </InputGroup>
                {rest}
            </div>
        );
    }
}



export default LandingPage;

