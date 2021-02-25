import React from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import NoteNavigationList from "./NoteNavigationList";
import NoteNavigationCategory from "./NoteNavigationCategory";

function NoteNavigation(props) {
  const { categories } = props;
  return (
    <aside className="note-navigation">
      {categories.map((category) => (
        <Card key={category.id}>
          <Card.Header>
            <NoteNavigationCategory categoryId={category.id} />
          </Card.Header>
          <Card.Body>
            <NoteNavigationList noteIds={category.childPageIds} level={0} />
          </Card.Body>
        </Card>
      ))}

      {/*{ categories.map(category =>*/}
      {/*    <Accordion defaultActiveKey="0" key={category.id}>*/}
      {/*        <Card>*/}
      {/*            <Card.Header>*/}
      {/*                <Accordion.Toggle as={Button} variant="link" eventKey="0">*/}
      {/*                    { category.name }*/}
      {/*                </Accordion.Toggle>*/}
      {/*            </Card.Header>*/}
      {/*            <Accordion.Collapse eventKey="0" className="note-collapse-list">*/}
      {/*                <NoteGroup noteIds={ category.childPageIds }/>*/}
      {/*            </Accordion.Collapse>*/}
      {/*        </Card>*/}
      {/*    </Accordion>*/}
      {/*)}*/}
    </aside>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: Object.values(state.notes.categories.byId),
  };
};
export default connect(mapStateToProps)(NoteNavigation);
