import Image from "next/image"
import Link from "next/link"

const BreadcrumbOne = ({ title, sub_title, style, link, link_title }: any) => {
   return (
      <div className="inner-banner-one inner-banner text-center z-1 pt-160 lg-pt-130 pb-160 xl-pb-120 md-pb-80 position-relative" style={{ overflow: 'hidden' }}>
         <Image 
            src="/images/hammer-group-fxIcYymZHJg-unsplash.jpg" 
            alt="propriétés prestige vues urbaines Montreal Paris Los Angeles Mexico Londres" 
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            className="lazy-img"
         />
         <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1 }} />
         <div className="container position-relative" style={{ zIndex: 2 }}>
            <h3 className="mb-35 xl-mb-20 pt-15 text-white">{title}</h3>
            <ul className="theme-breadcrumb style-none d-inline-flex align-items-center justify-content-center position-relative z-1 bottom-line">
               <li><Link href="/" className="text-white">Home</Link></li>
               <li className="text-white">/</li>
               {style && <>
                  <li><Link href={link} className="text-white">{link_title}</Link></li>
                  <li className="text-white">/</li>
               </>}
               <li className="text-white">{sub_title}</li>
            </ul>
         </div>
      </div>
   )
}

export default BreadcrumbOne;
