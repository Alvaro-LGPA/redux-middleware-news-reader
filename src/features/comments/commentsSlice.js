// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Create loadCommentsForArticleId here.

export const loadCommentsForArticleId = createAsyncThunk(
  'comment/loadCommentsForArticleId',
  async (id) => {
    const response = await fetch(`api/articles/${id}/comments`);
    const json = await response.json();
    return json;
  }

)
// Create postCommentForArticleId here.

export const postCommentForArticleId = createAsyncThunk(
  'comment/postCommentForArticleId',
  async ({ articleId, comment }) => {

    const requestBody = JSON.stringify({ articleId, comment });
    const response = await fetch(`api/articles/${articleId}/comments`, { method: 'POST', body: requestBody });
    const json = await response.json();
    return json

  }
)

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    // Add initial state properties here.
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false
  },
  // Add extraReducers here.

  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsForArticleId.pending, (state, action) => {
        state.isLoadingComments = true;
        state.failedToLoadComments = false;
      })
      .addCase(loadCommentsForArticleId.rejected, (state, action) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = true;
      })
      .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = false;
        state.byArticleId = { [action.payload.articleId]: action.payload.comments };
      })
      .addCase(postCommentForArticleId.pending, (state, action) => {
        state.createCommentIsPending = true;
        state.failedToCreateComment = false;
      })
      .addCase(postCommentForArticleId.fulfilled, (state, action) => {
        state.createCommentIsPending = false;
        state.failedToCreateComment = false;
        debugger;
        state.byArticleId[action.payload.articleId].push(action.payload);

      })
      .addCase(postCommentForArticleId.rejected, (state, action) => {
        state.createCommentIsPending = false;
        state.failedToCreateComment = true;
      })
  }

});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
