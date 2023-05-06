const AvatarBadge = ({ url, name }: { url: string; name: string }) => {
  return (
    <div className="flex items-center">
      <img
        src={url}
        alt={name}
        className="inline-block h-8 w-8 rounded-full ring-2 ring-white border indent-2"
      />
      <div className="text-sm ml-1">{name}님</div>
    </div>
  );
};

export default AvatarBadge;
