import {useState , useEffect} from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CurrencyPopUp = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen , setIsOpen] = useState(false);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const onClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF8EC] p-5 rounded-lg shadow-lg w-72"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-cormorant font-semibold text-[#546B41] mb-4">
          Select Currency
        </h2>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-4 py-2 font-cormorant font-semibold border-2 rounded"
          style={{
            borderColor: '#546B41',
            backgroundColor: '#FFF8EC',
            color: '#546B41',
          }}
        >
          <option value="INR">India (₹)</option>
          <option value="USD">USA ($)</option>
        </select>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded bg-[#546B41] text-white"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default CurrencyPopUp;