import { Dog } from "src/types/types";

const DogListCard = ({ dog }: { dog: Dog }) => (
    <div className="bg-white rounded-md shadow-md px-4 py-3 w-full max-w-md mb-4">
        <div className="flex items-center space-x-4 justify-between">
            <img src={dog.img} alt={dog.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="flex flex-col grow">
                <p className="text-lg font-medium text-gray-800">{dog.name}</p>
                <p className="text-sm text-gray-600">Breed: {dog.breed}</p>
                <p className="text-sm text-gray-600">Age: {dog.age} years</p>
            </div>
            <p className="text-sm text-gray-600">Zip {dog.zip_code}</p>
        </div>
    </div>
);

export default DogListCard;
