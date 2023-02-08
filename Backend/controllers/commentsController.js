
       // Get comments
       router.get('/post/:id/comment', (req, res) => {
        res.render('post-comment', {title: 'Post a comment'})
    })


    // Create and Post comments, this is where I think I made mistakes

    router.post('/post/:id/comment', async (req, res) => {
        const comment = new Comment({text: req.body.text});
        const post = await Post.findById(req.params.id);
        const savedPost = post.comments.push(comment);

        savedPost.save(function(err, results){
           if(err) {console.log(err)}
           res.render('post_details', {title: 'Post details', comments: 
            results.comments})
         } )
       })

     //  Get each post details. 
     // Trying to display comments, but it is all empty and I realized 
     // the comments array is empty, I can see the comments create in 
     // mongodb database why is that?????

    router.get('/post/:id', (req, res) => {
      Post.findById(req.params.id)
          .populate('comments')
          .exec(function(err, results) {
        if(err) {console.log(err)}
          res.render('post_details', {title: 'Post details', post: 
       results, comments: results.comments})
        })
      })