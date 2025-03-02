import { useState } from "react";
import { FiX, FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";
import { passwordReset } from "@/features/UserAuthSLice";

const PasswordReset = ({isOpen, setIsOpen}) => {

  const [isCopied, setIsCopied] = useState(false)
  const [email, setEmail] = useState('')
  
  const forgetPassword = async (e) => {
    e.preventDefault();
    await dispatch(passwordReset({ email })).unwrap();
    setIsOpen(false)
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true)
    toast.success("Copied")
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-blue-600 hover:underline transition-all duration-300 cursor-pointer"
      >
        Forget Password
      </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 flex items-center justify-center">
          <div className="bg-gray-900 text-white p-4 rounded-md shadow-lg sm:w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Reset Password</h3>
              <button className="cursor-pointer rounded-full hover:bg-zinc-950 p-4 transition-all duration-300" onClick={() => setIsOpen(false)}>
                <FiX size={18} />
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Enter Your Email ID to Reset Password
            </p>

            {/* Link Input */}
            <div className="flex items-center mt-3 border border-gray-600 rounded-md p-2 bg-gray-800">
              <input
                type="email"
                onChange={e => setEmail(e.target.value)}
                className="bg-transparent text-blue-400 w-full outline-none"
              />
              <button
                onClick={handleCopy}
                className={isCopied ? "ml-2 text-gray-400 cursor-not-allowed" : "ml-2 text-gray-400 hover:text-white cursor-pointer"}
                disabled={isCopied}
              >
                <FiCopy size={18} />
              </button>
            </div>

            <button
              onClick={forgetPassword}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md cursor-pointer transition-all duration-300"
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
