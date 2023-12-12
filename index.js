import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import http from 'http';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get('/', (req, res) => {
    res.render('index.ejs', { posts: posts });
})
app.get('/post1', (req, res) => {
    res.render('post1.ejs')
})
app.get('/create', (req, res) => {
    res.render('create.ejs', { posts: posts }); // Certifique-se de passar newPost mesmo que seja null
});
app.post('/create', (req, res) => {
    const postTitle = req.body.postTitle;
    const postContent = req.body.postContent;

    // Salve o post no array de posts
    posts.push({ title: postTitle, content: postContent });

    // Renderize a página novamente, agora com todos os posts exibidos
    res.redirect('/create');
});
app.post('/deletepost', (req, res) => {
    const index = req.body.postIndex;

    // Remova o post do array de posts usando o índice fornecido
    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1);
    }

    // Renderize a página novamente após excluir o post
    res.render('create.ejs', { posts: posts });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('working')
})