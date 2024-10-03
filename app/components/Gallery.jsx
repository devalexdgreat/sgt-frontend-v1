import Image from "next/image";
import imageEle from '@/public/img11.jpg';
import imageTwe from '@/public/img10.jpg';
import imageThir from '@/public/img13.jpg';
import imageFort from '@/public/img14.jpg';
import imageFift from '@/public/img15.jpg';
import imageSixt from '@/public/img16.jpg';
import imageSevt from '@/public/img17.jpg';

export default function Gallery() {
    return (
        <div className="w-full" id="gallery">
            <div className="w-11/12 mx-auto">
                <div className="text-center md:text-left">
                    <h1 className="font-bold text-xl">Our Gallery</h1>
                </div>
                <div className="columns-1 md:columns-4 lg:columns-4 gap-2 [&>div:not(:first-child)]:mt-2 mt-4 mb-12">
                    <div className=''>
                        <Image src={imageEle} alt='' className='w-full h-full' />
                    </div>
                    <div className=''>
                        <Image src={imageTwe} alt='' className='w-full h-full' />
                    </div>
                    <div className=''>
                        <Image src={imageSevt} alt='' className='w-full h-full' />
                    </div>
                    <div className=''>
                        <Image src={imageThir} alt='' className='w-full h-full' />
                    </div>
                    <div className=''>
                        <Image src={imageFort} alt='' className='w-full h-full' />
                    </div>
                    <div className=''>
                        <Image src={imageFift} alt='' className='w-full h-full' />
                    </div>
                    <div className=''>
                        <Image src={imageSixt} alt='' className='w-full h-full' />
                    </div>
                </div>
            </div>
        </div>
    );
}