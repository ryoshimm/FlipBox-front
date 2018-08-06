import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

// pages
import Top from '../../pages/Top'
import FlipCreate from '../../pages/FlipCreate'
import FlipDetail from '../../pages/FlipDetail'
import FlipEdit from '../../pages/FlipEdit'
import Search from '../../pages/Search'
import UserSettings from '../../pages/UserSettings'

// components
import Header from '../../components/Header'

// logic
import { initializedApp } from './logic'

// styles
import { WrapperMain } from './styles'


const AdminManager = (props) => (
  <div>
    [AdminManager]---------------------------------------------<br />
    ∟ isAuthenticated: {props.isAuthenticated.toString()}<br />
    ∟ isTokenChecked: {props.isTokenChecked.toString()}<br />
    - <a href='/'>top</a><br />
    - <a href='/settings'>/settings</a><br />
    - <a href='/flip/10'>/flip/10</a><br />
    - <a href='/flip/11'>/flip/11</a><br />
    - <a href='/flip/10/edit'>/flip/10/edit</a><br />
    - <a href='/flip/11/edit'>/flip/11/edit</a><br />
    - <a href='/new'>/new（flip新規kk作成）</a><br />
    - <a href='/search'>/search（クエリ設定なし）</a><br />
    - <a href='/search?q=react'>/search?q=react</a><br />
    - <a href='/search?p=2&q=react'>/search?p=2&q=react</a><br />
    - <a href='/search?p=2&q=react&s=bookmark'>/search?page=2&s=react&s=bookmark</a><br />
    ---------------------------------------------------------------------<br />
  </div>
)


class App extends Component {
  componentWillMount(){
    this.props.initializedApp()
  }

  render() {
    if (this.props.isTokenChecked) {
      return (
        <div className="App">
          <Header
            isAuthenticated={this.props.isAuthenticated}
            username={this.props.username}
          />

          <WrapperMain>
            <AdminManager {...this.props} />

            <br />

            <Switch>
              <Route exact path='/' component={Top} />
              <Route exact path='/flip/:flip_id' component={FlipDetail} />
              <Route path='/search' component={Search} />

              {(() => {
                if (this.props.isAuthenticated) {
                  return (
                    <Switch>
                      <Route path='/flip/:flip_id/edit' component={FlipEdit} />
                      <Route path='/new' component={FlipCreate} />
                      <Route path='/settings' component={UserSettings} />
                    </Switch>
                  )
                } else {
                  return (
                    <Redirect to='/' />
                  )
                }
              })()}
            </Switch>
          </WrapperMain>
        </div>
      )
    } else {
      return (
        <div className='App'>
          Loading...
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.App.isAuthenticated,
  isTokenChecked: state.App.isTokenChecked,
  username: state.App.username,
})

const mapDispatchToProps = (dispatch) => ({
  initializedApp: () => dispatch(initializedApp()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
