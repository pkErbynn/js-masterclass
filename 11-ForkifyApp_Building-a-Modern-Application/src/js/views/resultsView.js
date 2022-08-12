import { View } from './view';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
}

export default new ResultsView();   // only single instance to caller