import {Post} from './models/Post.Model';

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World'
        },
        getAllPost: async () => {
            return await Post.find();
        },
        getPost: async (_parent: any, args: any, _context: any, _info: any) => {
            return await Post.findById(args.id);
        }
    },
    Mutation: {
        createPost: async (_parent: any, args: any, _context: any, _info: any) => {
            const {title, description} = args.post;
            const post = new Post(
                {title, description}
            );
            await post.save();
            return post
        },
        deletePost: async (_parent: any, args: any, _context: any, _info: any) => {
            const id = args.id;
            await Post.findByIdAndDelete(id);
            return "Post Deleted!"
        },
        updatePost: async (_parent: any, args: any, _context: any, _info: any) => {
            const id = args.id;
            let ps = {};
            const {title, description} = args.post;

            if(title !== undefined && description !== undefined){
                ps = {
                   title: title,
                   description: description 
                };
            }else{
                if(title === undefined && description !== undefined){
                    ps = {
                        description: description 
                    };
                }
                if(title !== undefined && description === undefined){
                    ps = {
                        title: title 
                    };
                }
            }

            const post = await Post.findByIdAndUpdate(id, ps, {new: true});
            return post;
        }
    }
}

module.exports = resolvers;