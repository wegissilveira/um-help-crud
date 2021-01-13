import React from 'react';

import './App.css';

import Layout from './containers/Layout/Layout'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faPlus,
  faMinus,
  faChevronCircleRight,
  faSearch
} from '@fortawesome/free-solid-svg-icons'

import { 
  faTrashAlt
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faPlus,
  faMinus,
  faTrashAlt,
  faChevronCircleRight,
  faSearch
)



function App() {
  return (
    <Layout />
  );
}

export default App;
