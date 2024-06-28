import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRecipeByIdQuery, useGetCommentsByRecipeIdQuery, useAddCommentMutation } from '../services/recipes';
import { Container, Typography, Box, Rating, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import Navbar from './Navbar'; // Import the Navbar component

const RecipeDetailPage = () => {
  const { id } = useParams();
  const { data: recipe, error, isLoading } = useGetRecipeByIdQuery(id);
  const { data: comments, refetch: refetchComments } = useGetCommentsByRecipeIdQuery(id);
  const [addComment] = useAddCommentMutation();
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchComments();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetchComments]);

  const handleAddComment = async () => {
    if (newComment && rating) {
      await addComment({ recipeId: id, comment: newComment, rating });
      setNewComment('');
      setRating(0);
      refetchComments(); // Fetch comments again to include the new one
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipe details.</div>;

  return (
    <>

      <Container>
        <Typography variant="h3" component="h1" sx={{ marginTop: '20px' }}>
          {recipe.name}
        </Typography>
        <img src={`${process.env.REACT_APP_API_BASE_URL}${recipe.image}`} alt={recipe.name} style={{ width: '100%', borderRadius: '20px' }} />
        <Typography variant="h5" component="h2" sx={{ marginTop: '20px' }}>
          Ingredients
        </Typography>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h5" component="h2" sx={{ marginTop: '20px' }}>
          Instructions
        </Typography>
        <Typography variant="body1" component="p">
          {recipe.instructions}
        </Typography>
        <Typography variant="h5" component="h2" sx={{ marginTop: '20px' }}>
          Comments
        </Typography>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText primary={comment.comment} secondary={`Rating: ${comment.rating}`} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6" component="h3">
            Add a Comment
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ marginTop: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleAddComment} sx={{ marginTop: '10px', borderRadius: '20px' }}>
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default RecipeDetailPage;
