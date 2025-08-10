import undoable, { excludeAction } from 'redux-undo';
import elementListReducer from './elementListReducer';

const undoableElementListReducer = undoable(elementListReducer, {
  filter: excludeAction([
    'elementList/setCurrentElementId',
    'elementList/setAllElements',
  ]),
  limit: 50,
});

export default undoableElementListReducer;
