import React from "react";
import {connect} from "react-redux";
import NoteNavigationItem from "./NoteNavigationItem";

function NoteNavigationList(props) {
    const { notes, level } = props
    return (
        <div className="list">
           { notes.map(note => <NoteNavigationItem note={note} level={level} />) }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const notes = ownProps.noteIds.map(id => state.notes.byId[id])
    return { notes }
}

export default connect(mapStateToProps)(NoteNavigationList)