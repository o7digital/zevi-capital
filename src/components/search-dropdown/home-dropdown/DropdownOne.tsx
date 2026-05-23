import NiceSelect from "@/ui/NiceSelect";
import { useTranslation } from "@/contexts/TranslationContext";

const DropdownOne = ({ style }: any) => {
   const { t } = useTranslation();

   const selectHandler = (e: any) => { };
   const mexicoLocationOptions = [
      { value: "cdmx", text: "Ciudad de Mexico" },
      { value: "monterrey", text: "Monterrey" },
      { value: "guadalajara", text: "Guadalajara" },
      { value: "queretaro", text: "Queretaro" },
      { value: "puebla", text: "Puebla" },
      { value: "merida", text: "Merida" },
      { value: "cancun", text: "Cancun" },
      { value: "playa-del-carmen", text: "Playa del Carmen" },
      { value: "tulum", text: "Tulum" },
      { value: "los-cabos", text: "Los Cabos" },
   ];

   const searchHandler = () => {
      window.location.href = '/listing_0';
   };

   return (
      <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
         <div className="row gx-0 align-items-center">
         <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left">
                  <div className="label">{t('banner.searchLabel')}</div>
                  <NiceSelect className={`nice-select ${style ? "fw-normal" : ""}`}
                     options={[
                        { value: "apartments", text: t('searchDropdown.buyApartments') },
                        { value: "condos", text: t('searchDropdown.rentCondos') },
                        { value: "houses", text: t('searchDropdown.sellHouses') },
                        { value: "industrial", text: t('searchDropdown.rentIndustrial') },
                        { value: "villas", text: t('searchDropdown.sellVillas') },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className={`${style ? "col-xl-3" : "col-xl-4"} col-lg-4`}>
               <div className="input-box-one border-left">
                  <div className="label">{t('banner.location')}</div>
                  <NiceSelect className={`nice-select location ${style ? "fw-normal" : ""}`}
                     options={mexicoLocationOptions}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left border-lg-0">
                  <div className="label">{t('banner.priceRange')}</div>
                  <NiceSelect
                     className={`nice-select ${style ? "fw-normal" : ""}`}
                     options={[
                        { value: "1", text: "$10,000 - $200,000" },
                        { value: "2", text: "$20,000 - $300,000" },
                        { value: "3", text: "$30,000 - $400,000" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className={`${style ? "col-xl-3" : "col-xl-2"}`}>
               <div className="input-box-one lg-mt-10">
                  <button className={`fw-500 tran3s ${style ? "w-100 tran3s search-btn-three" : "text-uppercase search-btn"}`}>{style ? t('searchDropdown.searchNow') : t('banner.search')}</button>
               </div>
            </div>
         </div>
      </form>
   );
};

export default DropdownOne;
