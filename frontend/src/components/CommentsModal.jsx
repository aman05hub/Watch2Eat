import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/comments-modal.css'

const CommentsModal = ({ foodId, isOpen, onClose, onCommentAdd }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen && foodId) {
      fetchComments()
    }
  }, [isOpen, foodId])

  const fetchComments = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`https://watch2eat-backend.onrender.com/api/food/comments/${foodId}`, {
        withCredentials: true
      })
      setComments(response.data.comments || [])
    } catch (err) {
      setError('Failed to load comments')
      console.error('Error fetching comments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    
    if (!newComment.trim()) return

    setSubmitting(true)
    try {
      const response = await axios.post(
        'https://watch2eat-backend.onrender.com/api/food/comment',
        { foodId, comment: newComment },
        { withCredentials: true }
      )
      
      setComments([...comments, response.data.comment])
      setNewComment('')
      
      // Call the callback to update comment count in parent
      if (onCommentAdd) {
        onCommentAdd(foodId)
      }
    } catch (err) {
      setError('Failed to add comment')
      console.error('Error adding comment:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="comments-modal-overlay" onClick={onClose}>
      <div className="comments-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comments-modal-header">
          <h2>Comments</h2>
          <button 
            className="comments-modal-close" 
            onClick={onClose}
            aria-label="Close comments"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="comments-list">
          {loading && <p className="comments-loading">Loading comments...</p>}
          {error && <p className="comments-error">{error}</p>}
          
          {!loading && comments.length === 0 && (
            <p className="comments-empty">No comments yet....</p>
          )}

          {!loading && comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-header">
                <span className="comment-username">
                  {comment.user?.username || comment.username}
                </span>
                <span className="comment-time">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
        </div>

        <form className="comments-input-form" onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comments-input"
            disabled={submitting}
            spellCheck="false"
          />
          <button
            type="submit"
            className="comments-submit"
            disabled={!newComment.trim() || submitting}
          >
            {submitting ? '...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CommentsModal
