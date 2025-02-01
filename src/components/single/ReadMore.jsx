

const ReadMore = ({ project }) => {

  return (
    <div className="w-full border-gray-100 border mt-5">
      {/* Tab Header */}
      <div className="flex bg-[#e6ecfc]  py-3 px-5 font-bold">
        Description
      </div>

      {/* Description Content */}
      <div className="p-4">

        <div className=' text-sm content'
          dangerouslySetInnerHTML={{ __html: project.content }}>
        </div>


      </div>
    </div>
  );
};

export default ReadMore;
