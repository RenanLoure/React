//import logo from './logo.svg';
import { Component } from 'react';
import './styles.css';
import {loadPost} from '../../utils/load-post';
import {Posts} from '../../components/Posts';
import { Button } from '../../components/Button';
import {TextInput} from '../../components/TextInput';


class Home extends Component {
  state = {
      posts : [],
      allPosts : [],
      page : 0,
      postPerPage: 3,
      searchValue: ''
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

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value})
  }

  render() {
    const { posts, page, postPerPage, allPosts,searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;
    const filteredPost = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
  }) 
    : 
    posts;

    return (
      <section className='container'>
        <div className='search-container'>
        {!!searchValue && (
            <h1>search: {searchValue} </h1>
        )}

        <TextInput 
        searchValue={searchValue}
        handleChange={this.handleChange}
        />
        </div>

        {filteredPost.length > 0 && (
          <Posts posts={filteredPost} />
        )}

        {filteredPost.length === 0 && (
          <p>Not Found</p>
        )}

        <div className='button-container'>
          {!searchValue && (
            <Button
            text="Load more pages"
            onClick={this.loadMorePages}
            disabled={noMorePosts}
          />
          )}   
        </div>        
      </section>
        );
  }
}

export default Home;
