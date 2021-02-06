import React, {useState} from "react";
import {ChevronDown, ChevronRight, Circle, CircleFill, PlusCircle} from "react-bootstrap-icons";
import {noteSelected} from "../../features/slices/notesSlice";
import {connect} from "react-redux";
import NoteNavigationList from "./NoteNavigationList";

const LEVEL_PADDING_PX = 24;
const DISPLAY_BLOCK_STYLE = {visibility: 'visible'}
const DISPLAY_NONE_STYLE = {visibility: 'hidden'}

function NoteNavigationItem(props) {
    const { level, note, selectedNoteId, noteSelected } = props
    const [ plusButtonStyle, setPlusButtonStyle ] = useState(DISPLAY_NONE_STYLE)
    const [ isExpanded, setIsExpanded ] = useState(false)

    const divStyle = {paddingLeft: 20 + LEVEL_PADDING_PX * level}

    function hidePlus() {
        setPlusButtonStyle(DISPLAY_NONE_STYLE)
    }

    function showPlus() {
        setPlusButtonStyle(DISPLAY_BLOCK_STYLE)
    }

    function hasSubNotes(note) {
        return note.childPageIds && note.childPageIds.length > 0
    }

    function expand() {
        setIsExpanded(true)
    }

    function collapse() {
        setIsExpanded(false)
    }

    function selectNote() {
        noteSelected(note)
    }

    function getTitleClass() {
        return "title" + (note.id === selectedNoteId ? " active" : "");
    }

    function getIcon() {
        if (hasSubNotes(note)) {
            return isExpanded ?
                <ChevronDown className="list-icon" onClick={collapse}/> :
                <ChevronRight className="list-icon" onClick={expand}/>
        } else {
            // return <CircleFill className="list-icon-small"/>
            return <CircleFill className="hidden-icon"/>
        }
    }

    return (
        <>
            <div className="navigation-item"
                 onMouseOver={showPlus}
                 onMouseOut={hidePlus}
                 style={divStyle}>

                <div className="icon-container">{getIcon()}&nbsp;</div>
                <div className="plus-container" style={plusButtonStyle}><PlusCircle className="plus"/></div>
                <div className="title-container">
                    <span className={getTitleClass()}
                          onClick={selectNote}>
                        {note.title}
                    </span>
                </div>
            </div>
            { isExpanded && <NoteNavigationList noteIds={note.childPageIds} level={level +1}/> }
        </>


    )
}

const mapDispatchToProps = {
    noteSelected
}
const mapStateToProps = (state) => {
    return {
        selectedNoteId : state.notes.selectedNoteId
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteNavigationItem)