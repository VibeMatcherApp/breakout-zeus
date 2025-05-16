import { Dialog, Transition } from "@headlessui/react";
import { PartyPopper, Trophy, Stars } from "lucide-react";
import React, { Fragment } from "react";

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: "bronze" | "silver" | "gold";
}

const EligibilityModal: React.FC<EligibilityModalProps> = ({
  isOpen,
  onClose,
  tier,
}) => {
  const getTierContent = () => {
    switch (tier) {
      case "gold":
        return {
          icon: <Trophy className="h-12 w-12 text-yellow-400" />,
          title: "Gold Tier Achievement!",
          description: "You've qualified for our exclusive Gold tier benefits!",
          color: "from-yellow-400 to-amber-600",
        };
      case "silver":
        return {
          icon: <Stars className="h-12 w-12 text-gray-300" />,
          title: "Silver Tier Unlocked!",
          description: "You've reached the Silver tier with bonus features!",
          color: "from-gray-300 to-gray-400",
        };
      default:
        return {
          icon: <PartyPopper className="h-12 w-12 text-purple-400" />,
          title: "Congratulations!",
          description: "You're eligible to mint your NFT!",
          color: "from-purple-400 to-indigo-600",
        };
    }
  };

  const content = getTierContent();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`h-20 w-20 rounded-full bg-gradient-to-r ${content.color} mb-4 flex items-center justify-center`}
                  >
                    {content.icon}
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="mb-2 text-2xl font-bold leading-6 text-gray-900"
                  >
                    {content.title}
                  </Dialog.Title>
                  <p className="mb-6 text-gray-500">{content.description}</p>

                  <div className="flex w-full gap-3">
                    <button
                      type="button"
                      className="flex-1 justify-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      Proceed to Mint
                    </button>
                    <button
                      type="button"
                      className="flex-1 justify-center rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EligibilityModal;
