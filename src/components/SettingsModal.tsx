import React, { useState } from 'react';
import { X, User, Bell, Shield, Globe, Moon, Sun, Monitor } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { state: authState } = useAuth();
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'English',
    currency: 'USD',
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      activityTracking: false,
      dataSharing: false
    }
  });

  if (!isOpen) return null;

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleDirectChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="fixed right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-md shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="border-b border-gray-100 p-4 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/80 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Profile Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <User className="h-5 w-5 text-indigo-600" />
              <h3 className="font-medium text-gray-900">Profile</h3>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={authState.user?.avatar}
                alt="Profile"
                className="w-12 h-12 rounded-full ring-2 ring-indigo-100"
              />
              <div>
                <p className="font-medium text-gray-900">{authState.user?.name}</p>
                <p className="text-sm text-gray-500">{authState.user?.email}</p>
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Monitor className="h-5 w-5 text-indigo-600" />
              <h3 className="font-medium text-gray-900">Appearance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Theme</span>
                <div className="flex space-x-2">
                  {['light', 'dark', 'system'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => handleDirectChange('theme', theme)}
                      className={`p-2 rounded-lg transition-colors ${
                        settings.theme === theme
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {theme === 'light' && <Sun className="h-4 w-4" />}
                      {theme === 'dark' && <Moon className="h-4 w-4" />}
                      {theme === 'system' && <Monitor className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="h-5 w-5 text-indigo-600" />
              <h3 className="font-medium text-gray-900">Notifications</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <button
                    onClick={() => handleSettingChange('notifications', key, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-5 w-5 text-indigo-600" />
              <h3 className="font-medium text-gray-900">Privacy</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <button
                    onClick={() => handleSettingChange('privacy', key, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Language & Region */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="h-5 w-5 text-indigo-600" />
              <h3 className="font-medium text-gray-900">Language & Region</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Language</span>
                <select
                  value={settings.language}
                  onChange={(e) => handleDirectChange('language', e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Currency</span>
                <select
                  value={settings.currency}
                  onChange={(e) => handleDirectChange('currency', e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}