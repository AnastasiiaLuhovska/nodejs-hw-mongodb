const ctrlWrapper = (asyncFunc) => {
    return async(req, res, next)=>{
        try{
            await asyncFunc(req, res, next)
        }catch(e){
             next(e)
            }
        }
};

export default ctrlWrapper;