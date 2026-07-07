import pytest
from unittest.mock import MagicMock, patch
from app.database.repositories.repositories import UserRepository, ConversationRepository, SnippetRepository, ExplanationRepository, ChatRepository
from app.core.exceptions import AppException

@patch('app.database.repositories.base.get_supabase_client')
def test_user_repository(mock_get_client):
    # Setup mock client
    mock_client = MagicMock()
    mock_get_client.return_value = mock_client
    
    # Setup mock response
    mock_response = MagicMock()
    mock_response.data = [{"id": "user-123", "clerk_user_id": "clerk_123"}]
    mock_client.table().insert().execute.return_value = mock_response
    mock_client.table().select().eq().execute.return_value = mock_response
    
    repo = UserRepository()
    
    # Test Create
    user = repo.create({"clerk_user_id": "clerk_123", "email": "test@test.com"})
    assert user["id"] == "user-123"
    
    # Test Get by Clerk ID
    fetched_user = repo.get_user_by_clerk_id("clerk_123")
    assert fetched_user["id"] == "user-123"

@patch('app.database.repositories.base.get_supabase_client')
def test_conversation_repository(mock_get_client):
    mock_client = MagicMock()
    mock_get_client.return_value = mock_client
    
    mock_response = MagicMock()
    mock_response.data = [{"id": "conv-123", "title": "Test Conv"}]
    mock_client.table().insert().execute.return_value = mock_response
    mock_client.table().select().eq().order().execute.return_value = mock_response
    
    repo = ConversationRepository()
    
    # Test Create
    conv = repo.create({"user_id": "user-123", "title": "Test Conv"})
    assert conv["id"] == "conv-123"
    
    # Test List
    convs = repo.list(filters={"user_id": "user-123"})
    assert len(convs) == 1
    assert convs[0]["id"] == "conv-123"

# Similar tests can be extended for SnippetRepository, ExplanationRepository, ChatRepository
