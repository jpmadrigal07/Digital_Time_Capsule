import React, { Component } from 'react';
import MainNavBar from './partials/MainNavBar';

class AddPost extends Component {

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#F8F9FA';
  }

  render() {
    return (
      <div>
        <MainNavBar {...this.props} />
        <main role="main" class="container">
            <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow">
                <img class="mr-3" src="https://getbootstrap.com/assets/brand/bootstrap-outline.svg" alt="" width="48" height="48" />
                <div class="lh-100">
                <h6 class="mb-0 text-white lh-100">Bootstrap</h6>
                <small>Since 2011</small>
                </div>
            </div>

            <div class="my-3 p-3 bg-white rounded box-shadow">
                <h6 class="border-bottom border-gray pb-2 mb-0">Recent updates</h6>
                <div class="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded" />
                <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <strong class="d-block text-gray-dark">@username</strong>
                    Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
                </div>
                <div class="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=e83e8c&fg=e83e8c&size=1" alt="" class="mr-2 rounded" />
                <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <strong class="d-block text-gray-dark">@username</strong>
                    Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
                </div>
                <div class="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=6f42c1&fg=6f42c1&size=1" alt="" class="mr-2 rounded" />
                <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <strong class="d-block text-gray-dark">@username</strong>
                    Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
                </div>
                <small class="d-block text-right mt-3">
                <a href="#">All updates</a>
                </small>
            </div>

            <div class="my-3 p-3 bg-white rounded box-shadow">
                <h6 class="border-bottom border-gray pb-2 mb-0">Suggestions</h6>
                <div class="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded" />
                <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <div class="d-flex justify-content-between align-items-center w-100">
                    <strong class="text-gray-dark">Full Name</strong>
                    <a href="#">Follow</a>
                    </div>
                    <span class="d-block">@username</span>
                </div>
                </div>
                <div class="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded" />
                <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <div class="d-flex justify-content-between align-items-center w-100">
                    <strong class="text-gray-dark">Full Name</strong>
                    <a href="#">Follow</a>
                    </div>
                    <span class="d-block">@username</span>
                </div>
                </div>
                <div class="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded" />
                <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <div class="d-flex justify-content-between align-items-center w-100">
                    <strong class="text-gray-dark">Full Name</strong>
                    <a href="#">Follow</a>
                    </div>
                    <span class="d-block">@username</span>
                </div>
                </div>
                <small class="d-block text-right mt-3">
                <a href="#">All suggestions</a>
                </small>
            </div>
        </main>
      </div>
    );
  }
}

export default AddPost;
