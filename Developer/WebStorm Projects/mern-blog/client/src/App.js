import React from 'react';

state = {
    posts: [],
};

class App extends React.Component {
  render() {
    return (
        <div>
            <ul>
                {this.state.posts.map(post => <li key = {post.id}>{post.title}</li>)}
            </ul>
        </div>
    );
  }
}

export default App;