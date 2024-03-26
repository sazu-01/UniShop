"use strict";

export const FindUsersService = async ({limit,page,search},Model) => {
    try {
          //convert page and limit to numbers
          const pageNum = Number(page);
          const limitNum = Number(limit);
  
          //define the search regex pattern
          const searchPattern = `.*${search}.*`;
  
          // Define the filter for the database query
          const filter = {
              isAdmin: { $ne: true },
              $or: [
                  { name: { $regex: new RegExp(searchPattern, "i") } },
                  { email: { $regex: new RegExp(searchPattern, "i") } },
                  { password: { $regex: new RegExp(searchPattern, "i") } }
              ]
          };
  
          //set password to false
          const options = { password: 0 };
  
          //get all the users from database
          const users = await Model.find(filter, options)
          .limit(limitNum).skip((pageNum - 1) * limitNum);
  
          //countDocuments for all the filter user
          const count = await Model.find(filter).countDocuments();
  
          //if no user found , throw an error 
          if (!users) throw HttpError(404, "no user found");
  
          //calculate the totalNumbers of page
          const totalPages = Math.ceil(count / limitNum);

          //reutrn the users and pagination
          return {
            users,
            pagination: {
                totalPages,
                currentPage: pageNum,
                previousPage: pageNum - 1 ? pageNum - 1 : null,
                nextPage: pageNum < totalPages ? pageNum + 1 : null,
            }
          }
  
    } catch (error) {
        throw error
    }
 }


