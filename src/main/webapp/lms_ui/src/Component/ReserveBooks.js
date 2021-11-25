import React, {Component, useState} from "react";
import {withRouter} from "react-router-dom";
import Item from "./bookItemStud";
import Fuse from "fuse.js";
import LibNavbar from "./LibNavbar";
import StudentNavbar from "./StudentNavbar";


class ReserveBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{name: "harry potter", tags: ["Jk Rowling", "Dumbledore"]}, {name: "abc murder", tags: ["Agatha Christie"]
            },{name: "Perks of being a wallflower", tags: ["Someone"]}, {name: "A series of Unfortunate Events", tags: ["Lemony Snicket"]
            },{name: "Random Random", tags: ["Jk Rowling", "Dumbledore"]}, {name: "QUX", tags: ["Agatha Christie"]
            },{name: "Random chikichiki", tags: ["Jk Rowling", "Dumbledore"]}],
            searchData:[],
            noResults:"none"
        }
        this.searchItem = this.searchItem.bind(this)
    }
    componentDidMount() {
        this.setState({searchData: this.state.data})
    }

    searchItem = (query) => {
        if(query===""){
            this.setState({searchData: this.state.data})
        }
        else{
            const fuse = new Fuse(this.state.data, {
                keys: ["name", "tags"]
            });
            const result = fuse.search(query);
            const finalResult = [];
            if (result.length) {
                result.forEach((item) => {
                    finalResult.push(item.item);
                });
                this.setState({searchData: finalResult, noResults: "none"})
            } else {
                this.setState({searchData: this.state.data, noResults:"inline"})
            }
        }
    };

    render() {

        return (
            <div>
                <StudentNavbar/>

                <script src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js"></script>
                <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css"/>
                <link rel="stylesheet"
                      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                      crossOrigin="anonymous"/>
                <div className="container mt-4">
                    <h1 className="display-4 text-center">
                        <i className="fas fa-book-open text-primary"/>
                        <span className="text-secondary">Reserve</span> Books
                    </h1>
                    <br/><br/>
                    <div className="search-container">
                        <input
                            className="form-control m-3 mr-5"
                            type="search"
                            onChange={(e) => this.searchItem(e.target.value)}
                            placeholder="Search Book"
                        />
                    </div>
                    <p style={{display:this.state.noResults}}>No Results found.... Displaying all books </p>
                    <div className="bookItemContainer">
                        {this.state.searchData.map((item) => (
                            <Item {...item} key={item.name} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(ReserveBooks)
