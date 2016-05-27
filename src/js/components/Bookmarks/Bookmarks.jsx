import React, { Component } from "react";
import BallotStore from "../../stores/BallotStore";
import BookmarkItem from "./BookmarkItem";
import LoadingWheel from "../LoadingWheel";

export default class Bookmarks extends Component {
  static propTypes = {
  };

  constructor (props){
    super(props);
    this.state = {};
  }

  componentDidMount () {
    this.listener = BallotStore.addListener(this._onChange.bind(this));
    this._onChange();
  }

  componentWillUnmount (){
    this.listener.remove();
  }

  _onChange (){
    this.setState({bookmarks: BallotStore.bookmarks });
  }

  render () {
    if (!this.state.bookmarks){
      return LoadingWheel;
    }
    return (
      <div>
      <h4>What I Have Bookmarked</h4>
      <ul>
    {
      this.state.bookmarks.map(bookmark =>{
        return <BookmarkItem key={bookmark.ballot_item_display_name} bookmark={bookmark} />;
      })
    }
    </ul>
      </div>);
  }
}
