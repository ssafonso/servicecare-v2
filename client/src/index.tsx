import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MapPage from './pages/MapPage/MapPage';

ReactDOM.render(
  <React.StrictMode>
    <MapPage />
    <script src="https://apis.google.com/js/api.js" type="text/javascript"></script>
    <script type="text/javascript">
      gapi.load('auth2', function() {
      });
    </script>
  </React.StrictMode>,
  document.getElementById('root')
);
