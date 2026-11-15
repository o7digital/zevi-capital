import NiceSelect from "@/ui/NiceSelect";
import { useTranslation } from "@/contexts/TranslationContext";

const DropdownOne = ({ style }: any) => {
   const { t } = useTranslation();

   const selectHandler = (e: any) => { };

   const searchHandler = () => {
      window.location.href = '/#properties';
   };

   return (
      <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
         <div className="row gx-0 align-items-center">
         <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left">
                  <div className="label">{t('banner.searchLabel')}</div>
                  <NiceSelect className={`nice-select ${style ? "fw-normal" : ""}`}
                     options={[
                        { value: "buy", text: t('searchDropdown.buyProperty') },
                        { value: "rent", text: t('searchDropdown.rentProperty') },
                        { value: "sell", text: t('searchDropdown.sellProperty') },
                        { value: "commercial", text: t('searchDropdown.commercialSpaces') },
                        { value: "industrial", text: t('searchDropdown.industrialProperties') },
                        { value: "investment", text: t('searchDropdown.investmentLand') },
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
                     options={[
                        { value: "zona-esmeralda", text: "Zona Esmeralda, Estado de México" },
                        { value: "atizapan", text: "Atizapán de Zaragoza, Estado de México" },
                        { value: "naucalpan", text: "Naucalpan de Juárez, Estado de México" },
                        { value: "huixquilucan", text: "Huixquilucan, Estado de México" },
                        { value: "tlalnepantla", text: "Tlalnepantla, Estado de México" },
                        { value: "tecamachalco", text: "Tecamachalco, Estado de México" },
                        { value: "polanco", text: "Polanco, CDMX" },
                        { value: "acapulco", text: "Acapulco, Guerrero" },
                     ]}
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
                        { value: "1", text: "$0 - $1,000,000 MXN" },
                        { value: "2", text: "$1,000,000 - $5,000,000 MXN" },
                        { value: "3", text: "$5,000,000 - $10,000,000 MXN" },
                        { value: "4", text: "$10,000,000+ MXN" },
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
