import dva from 'dva';
import createLogger from 'redux-logger';
import createHistory from 'history/createBrowserHistory'
import './index.css';
// 1. Initialize
const app = dva({
  // history:createHistory,
  onAction: createLogger,
});

// 2. Plugins
//  app.use(createLogger());
// 3. Model
 app.model(require('./models/TestModel').default);
 app.model(require('./models/AccountModel').default);

// 4. Router
app.router(require('./router').default);


// 5. Start
app.start('#root');
