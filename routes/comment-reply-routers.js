const express = require("express");
const router = express.Router();

const verifyAuthenticated = require("../modules/verify-auth.js");
const commentDao = require("../modules/dao-comment.js");


router.post('/post-comment', verifyAuthenticated, async (req, res) => {

    const comment = {
        postId: req.session.postId,
        posterId: req.session.user.id,
        content: req.body.comment,
    }

    await commentDao.createComment(comment);

    res.redirect(`/fulltext?id=${req.session.postId}`)
});

router.post('/reply-comment', async (req, res) => {

    await commentDao.addReplyToComment(req.body.commentId,req.body.replyContent, req.body.replierId, req.body.posterId);

});


router.get('/delete-comment',async (req, res) => {

   await commentDao.deleteComments(req.query.id);

})


router.get('/delete-reply',async (req, res) => {


    await commentDao.deleteReplies(req.query.id);


})




module.exports = router;
