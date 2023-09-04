import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PostPage } from '../post.page';

test('renders "Post not found" when location state is missing', () => {
    const { getByText } = render(
        <MemoryRouter initialEntries={['/post/1']}>
            <Routes>
                <Route path="/post/:id" element={<PostPage message="Hello from " componentName="PostPage" />} />
            </Routes>
        </MemoryRouter>
    );

    const postNotFoundElement = getByText('Post not found');
    expect(postNotFoundElement).toBeInTheDocument();
});

test('renders post content when location state is provided', async () => {
    const mockPost = {
        postTitle: 'Test Post',
        userName: 'Test User',
        postBody: 'This is a test post.',
        comments: [],
    };

    const { findByText } = render(
        <MemoryRouter initialEntries={['/post/1']}>
            <Routes>
                <Route
                    path="/post/:id"
                    element={<PostPage message="Hello from " componentName="PostPage" />}
                />
            </Routes>
        </MemoryRouter>
    );

    jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        json: async () => ({ post: mockPost }),
    } as Response);    
    

    const postTitleElement = await findByText('Test Post');
    const userNameElement = await findByText('User: Test User');
    const postBodyElement = await findByText('This is a test post.');
    
    expect(postTitleElement).toBeInTheDocument();
    expect(userNameElement).toBeInTheDocument();
    expect(postBodyElement).toBeInTheDocument();
});
