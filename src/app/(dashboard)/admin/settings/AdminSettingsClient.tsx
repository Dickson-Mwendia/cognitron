'use client'

import { useState } from 'react'
import { CreditCard, Bell, Megaphone, Settings, Check, X } from 'lucide-react'

interface PricingPlan {
  id: string
  name: string
  priceKes: number
  billingPeriod: string
  track: string
  isActive: boolean
  features: string[]
}

interface NotificationTemplate {
  id: string
  name: string
  subject: string
  channel: string
  isActive: boolean
}

interface PlatformSetting {
  key: string
  value: string
  description: string
}

interface Props {
  pricingPlans: PricingPlan[]
  notificationTemplates: NotificationTemplate[]
  platformSettings: PlatformSetting[]
}

type Tab = 'pricing' | 'notifications' | 'announcements' | 'general'

const tabs: { id: Tab; label: string; icon: typeof CreditCard }[] = [
  { id: 'pricing', label: 'Pricing Plans', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'general', label: 'General', icon: Settings },
]

const trackIcons: Record<string, string> = { coding: '💻', ai: '🤖', chess: '♟️', bundle: '📦' }

export default function AdminSettingsClient({
  pricingPlans,
  notificationTemplates,
  platformSettings,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('pricing')

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#0c1b33]">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#0c1b33] text-[#0c1b33]'
                  : 'border-transparent text-[#0c1b33]/40 hover:text-[#0c1b33]/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Pricing Plans */}
      {activeTab === 'pricing' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#0c1b33]/60">Manage subscription plans and pricing.</p>
            <button
              type="button"
              className="rounded-lg bg-[#0c1b33] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162d50]"
            >
              Add Plan
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span>{trackIcons[plan.track]}</span>
                    <h3 className="font-heading font-bold text-[#0c1b33]">{plan.name}</h3>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    plan.isActive ? 'bg-[#2a9d8f]/10 text-[#2a9d8f]' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {plan.isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#0c1b33] mb-1">
                  KES {plan.priceKes.toLocaleString()}
                  <span className="text-sm font-normal text-[#0c1b33]/40">/{plan.billingPeriod}</span>
                </p>
                <ul className="mt-3 space-y-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#0c1b33]/60">
                      <Check className="w-3 h-3 text-[#2a9d8f] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-xs font-medium text-[#0c1b33] transition-colors hover:bg-gray-50"
                >
                  Edit Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notification Templates */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <p className="text-sm text-[#0c1b33]/60">Manage notification templates sent to parents, students, and coaches.</p>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Template</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Channel</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#0c1b33]/50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {notificationTemplates.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-[#0c1b33]">{t.name}</td>
                    <td className="px-4 py-3 text-[#0c1b33]/60">{t.subject}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-[#0c1b33]/5 px-2 py-0.5 text-xs font-medium capitalize">{t.channel}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        t.isActive ? 'bg-[#2a9d8f]/10 text-[#2a9d8f]' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {t.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="text-xs font-medium text-[#2a9d8f] hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Announcements */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#0c1b33]/60">Create platform-wide announcements.</p>
            <button
              type="button"
              className="rounded-lg bg-[#0c1b33] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162d50]"
            >
              New Announcement
            </button>
          </div>
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Megaphone className="w-8 h-8 mx-auto text-[#0c1b33]/20 mb-3" />
            <p className="text-sm font-medium text-[#0c1b33]/60">No active announcements</p>
            <p className="text-xs text-[#0c1b33]/40 mt-1">Create one to notify students, parents, or coaches.</p>
          </div>
        </div>
      )}

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-4">
          <p className="text-sm text-[#0c1b33]/60">Platform configuration and general settings.</p>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {platformSettings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-[#0c1b33]">{setting.description}</p>
                    <p className="text-xs text-[#0c1b33]/40 font-mono">{setting.key}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#0c1b33]">{setting.value}</span>
                    <button type="button" className="text-xs font-medium text-[#2a9d8f] hover:underline">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
