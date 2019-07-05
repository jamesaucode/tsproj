import * as express from 'express';

const postJoinGroup : express.RequestHandler = (req, res) => {
    if (req.isAuthenticated()) {
        const groupName = req.params.name;
    } else {
        return res.redirect('back');
    }
}

export default postJoinGroup;