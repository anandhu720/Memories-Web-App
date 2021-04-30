import React from 'react';
// import Post from "./Post/Post.jsx";
import useStyles from "./styles.js"
import {useSelector} from 'react-redux';
import { Grid,CircularProgress } from '@material-ui/core';
import { Card,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost , likePost } from '../../actions/posts';


const Posts =({setCurrentId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.posts);
    console.log(posts);
    return(
        <>
        {!posts.length ?  <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map((post)=>(
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                                <div className={classes.overlay}>
                                    <Typography variant='h6'>{post.creator}</Typography>
                                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                                </div>
                                <div className={classes.overlay2}>
                                    <Button style={{color:'white'}} size='small' color='primary' onClick={()=>setCurrentId(post._id)}><MoreHorizIcon fontSize="default"/></Button>
                                </div>
                                <div className={classes.details}>
                                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>`#${tag} `)}</Typography>
                                </div>
                                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
                                    <CardContent>
                                        <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
                                    </CardContent>
                                    <CardActions className={classes.cardActions}>
                                        <Button size='small' color='primary' onClick={()=>dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize='small'/>Like&nbsp;{post.likeCount}</Button>
                                        <Button size='small' color='primary' onClick={()=>dispatch(deletePost(post._id))}><DeleteIcon fontSize='small'/>Delete</Button>
                                    </CardActions>
                               
                        </Card>                
                    </Grid>
                ))}
            </Grid>
        )}
        </>
    )
}

export default Posts;