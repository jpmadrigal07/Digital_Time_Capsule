import React from 'react';

const AddPost = () => {
    return (
        <div>
            <main role="main" class="container">
                <div class="my-3 p-3 bg-white rounded box-shadow">
                    <form>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Message</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write here..."></textarea>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Add File (Image or video)</label>
                            <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                        </div>
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddPost;