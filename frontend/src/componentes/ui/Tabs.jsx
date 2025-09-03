import React, { useState } from "react";

export function Tabs({ defaultValue, children, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const childrenArray = React.Children.toArray(children);
  const tabsList = childrenArray.find(child => child.type === TabsList);
  const tabsContent = childrenArray.filter(child => child.type === TabsContent);

  return (
    <div className={className}>
      {tabsList && React.cloneElement(tabsList, { activeTab, setActiveTab })}
      {tabsContent.map(content => 
        React.cloneElement(content, { 
          isActive: content.props.value === activeTab 
        })
      )}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab, className = "" }) {
  return (
    <div className={`flex bg-gray-100 p-1 rounded-lg ${className}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          isActive: child.props.value === activeTab,
          onClick: () => setActiveTab(child.props.value)
        })
      )}
    </div>
  );
}

export function TabsTrigger({ children, isActive, onClick, className = "", ...props }) {
  return (
    <button
      className={`flex items-center justify-center flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? "bg-white text-blue-600 shadow-sm" 
          : "text-gray-600 hover:text-gray-900"
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, isActive, className = "", ...props }) {
  return (
    <div className={`mt-4 ${isActive ? "block" : "hidden"} ${className}`} {...props}>
      {children}
    </div>
  );
}