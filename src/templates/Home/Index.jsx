//import logo from './logo.svg';
import { Component } from 'react';
import './styles.css';
import {loadPost} from '../../utils/load-post';
import {Posts} from '../../components/Posts';
import { Button } from '../../components/Button';


class Home extends Component {
  state = {
      posts : [],
      allPosts : [],
      page : 0,
      postPerPage: 3
    };

    async componentDidMount() {
      await this.loadPosts();
    }

    loadPosts = async () => {
      const { page, postPerPage } = this.state
      const postAndPhotos = await loadPost()
      this.setState({ 
        posts: postAndPhotos.slice(page, postPerPage),
        allPosts : postAndPhotos,
      })
    }

  loadMorePages = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postPerPage;
    const nextPost = allPosts.slice(nextPage, postPerPage + nextPage)
    posts.push(...nextPost);

    this.setState({ posts, page: nextPage })
  }

  render() {
    const { posts, page, postPerPage, allPosts } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;

    return (
      <section className='container'>
        <Posts posts={posts} />

        <div class='button-container'>
        <Button
          text="Load more pages"
          onClick={this.loadMorePages}
          disabled={noMorePosts}
        />
        </div>        
      </section>
        );
  }
}

export default Home;
